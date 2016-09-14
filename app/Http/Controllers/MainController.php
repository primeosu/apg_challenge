<?php

namespace App\Http\Controllers;

use App\Classification;
use App\FileType;
use App\HashName;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

use App\Http\Requests;
use League\Csv\Reader;

class MainController extends Controller
{
    public function index(Request $request){
        return view()->make('index');
    }

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
                $ctype = $row['ClassificationType'];
                $type = $row['FileType'];

                $classifications[$ctype] = $classifications[$ctype] ?? Classification::firstOrCreate(['name' => $ctype]);
                $fileTypes[$type] = $fileTypes[$type] ?? FileType::firstOrCreate(['type' => $type]);

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

    public function dashboard(){
        $classifications = Classification::all();

        foreach($classifications as &$classification){
            $classification->numHashes = $classification->hashes()->count();
        }

        return view()->make('dashboard', ['classification' => $classifications]);
    }
}
