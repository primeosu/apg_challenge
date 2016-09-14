<?php

namespace App\Http\Controllers;

use App\Classification;
use App\FileType;
use App\HashName;
use Illuminate\Http\Request;

use App\Http\Requests;
use League\Csv\Reader;

class MainController extends Controller
{
    /**
     * Basic index
     * @param Request $request
     * @return \Illuminate\Contracts\View\View
     */
    public function index(Request $request){
        return view()->make('index');
    }

    /**
     * Handles CSV uploads
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function upload(Request $request){
        //Ignoring filetype as it requires a little more work to get 'all' csv types
        $this->validate($request, [
            'upfile' => 'required|file'
        ]);

        $file = $request->file('upfile');
        try {
            $csv = Reader::createFromPath($file->getRealPath());

            /**
             * Approach:
             *  Assuming these tables can get quite large I optimize in other querying what I need for this file
             *   rather than pulling all filetypes and all classification types.
             */
            $classifications = [];
            $fileTypes = [];
            foreach ($csv->fetchAssoc() as $row) {
                $ctype = strtolower($row['ClassificationType']);
                $type = strtolower($row['FileType']);

                //Try to pull from memory first
                $classifications[$ctype] = $classifications[$ctype] ?? Classification::firstOrCreate(['name' => $ctype]);
                $fileTypes[$type] = $fileTypes[$type] ?? FileType::firstOrCreate(['type' => $type]);

                if(HashName::where('md5',$row['MD5'])->first()) continue;

                //Create (ignores duplicates)
                HashName::firstOrCreate([
                    'md5' => $row['MD5'],
                    'name' => $row['ClassificationName'],
                    'size' => $row['Size'],
                    'classification_type_id' => $classifications[$row['ClassificationType']]->id,
                    'file_type_id' => $fileTypes[$type]->id
                ]);
            }

        //Just catch everything for now... Normally you'd find exactly what can go wrong
        } catch(\Exception $e){
            return redirect()->back()->withErrors([$e->getMessage()]);
        }

        return redirect()->route('dashboard');
    }

    /**
     * Basic dashboard, displays classification counts
     * @return \Illuminate\Contracts\View\View
     */
    public function dashboard(){
        return view()->make('dashboard', ['classification' => Classification::hashCounts()]);
    }
}
