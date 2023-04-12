<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $comments = Comment::where('post_id', $id)->orderBy('id', 'desc')->get();
        return view('templates.comments', compact('comments'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'comment' => 'required'
            ],
            [
                'comment.required' => 'Please give comment'
            ]
        );

        $comment = Comment::create([
            'comment' => $request->comment,
            'post_id' => $request->post_id
        ]);

        return $comment;
    }
}
