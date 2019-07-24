<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Attendant;
use App\Event;

class AdminAttendantsController extends Controller
{
    /**
     * Export attendants list as csv
     */
    public function export(Request $request, $event_id)
    {
        $headers = [
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',   
            'Content-type' => 'text/csv',   
            'Content-Disposition' => 'attachment; filename=attendants.csv',   
            'Expires' => '0',   
            'Pragma' => 'public'
        ];

        $event = Event::findOrFail($event_id);
        $attendants = $event->attendants()->with('group')->with('package')->get();
        $columns = [
            'First Name', 
            'Last Name', 
            'Email',
            'Age Group', 
            'Housing', 
            'Affiliate',
            'Roommates',
            'Dietary'
        ];

        $callback = function() use ($attendants, $columns)
        {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach($attendants as $attendant) {
                $row = [
                    $attendant->first_name,
                    $attendant->last_name,
                    $attendant->email,
                    $attendant->group->description,
                    $attendant->package->title,
                    $attendant->custom_properties['affiliate'],
                    $attendant->custom_properties['roommates'],
                    $attendant->custom_properties['dietary'],
                ];
                fputcsv($file, $row);
            }
            fclose($file);
        };
        return response()->streamDownload($callback, 'attendants-' . date('d-m-Y-H:i:s').'.csv', $headers);
    }
}
