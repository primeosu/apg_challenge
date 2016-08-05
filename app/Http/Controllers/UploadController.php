<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use File;
use App\Malware;
use App\Upload;
use Carbon\Carbon;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UploadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $uploads = Upload::paginate(25);
        return view('upload.index')->with("uploads", $uploads);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Store into folder for backup and add onto the table
        $dir = "uploads/";
        $file = $dir . basename($_FILES["uploaded_file"]["name"]);

        // basic validation checking and upload success
        if (pathinfo($file, PATHINFO_EXTENSION) != "csv") {
          return view('errors.genericerror')->with("errmsg", "The file you tried to upload is not a CSV file");
        } else {
          if (move_uploaded_file($_FILES["uploaded_file"]["tmp_name"], $file)) {
            // echo "The file ". basename( $_FILES["uploaded_file"]["name"]). " has been uploaded.";
          } else {
            return view('errors.genericerror')->with("errmsg", "Sorry, we are looking into the issue!");
          }
        }

        $old = "uploads/" . $_FILES["uploaded_file"]["name"];
        $new = "uploads/" . Carbon::now() . ".csv";

        $contents = File::get($old);
        $contents = str_getcsv(str_replace("\n", ",", $contents)); //will add extra "," to end

        // floor() removes decimal place due to extra empty value after last comma
        $length = floor(count($contents) / 5);

        // start at 1 to ignore the headers 'MD5,' 'Classification,' etc.
        for($x = 1; $x < $length; $x++) {

          $malware = new Malware;

          $malware->MD5 = $contents[$x * 5];
          $malware->ClassificationName = $contents[$x * 5 + 1];
          $malware->ClassificationType = $contents[$x * 5 + 2];
          $malware->Size = $contents[$x * 5 + 3];
          $malware->FileType = $contents[$x * 5 + 4];

          $malware->save();
        }

        // rename csv to timestamps
        rename($old, $new);

        $upload = new Upload;
        $upload->path = $new;
        $upload->name = $_FILES["uploaded_file"]["name"];
        $upload->save();

        $malwares = Malware::paginate(25);
        return redirect('/malware')->with('malwares', $malwares);
    }

    public function rebuildFromBackup() {

    }

    public function deleteAll(Request $request)
    {

        if($request->deletekey == 'IntelRox') {
          // delete all upload backups
          $files = glob('uploads/*');
          foreach($files as $file) {
            unlink($file);
          }

          $uploads = Upload::all();
          foreach($uploads as $upload) {
            $upload->delete();
          }
        } else {
          return view('errors.genericerror')->with('errmsg','You can\'t delete that way!');
        }
    }
}
