<?php

    require '../libs/Slim/Slim.php';
    require 'dbConnect.php';
    require 'listsFunctions.php';
    require 'itemsFunctions.php';
    require 'helperFunctions.php';


    \Slim\Slim::registerAutoloader();

    $app = new \Slim\Slim();
    $app->contentType('application/json');

    //PROJECTS

    $app->get(
        '/projects', 'getProjects'
    );

    $app->get(
        '/project/:id', 'getProject'
    );

    $app->post(
        '/projects', 'addProject'
    );
    
    $app->put(
        '/project/:id', 'updateProject'
    );

    $app->delete(
        '/project/:id', 'deleteProject'
    );

    //RUNNERS

    $app->get(
        '/runners/adults', 'getAllAdultRunners'
    );

    $app->get(
        '/runners/halfmarathon', 'getSmRunners'
    );

    $app->get(
        '/runners/cross', 'getCrossRunners'
    );

    $app->get(
        '/runners/relay4', 'getRelay4Runners'
    );

    $app->get(
        '/runners/relay2', 'getRelay2Runners'
    );

    $app->post(
        '/runners/adults', 'addRunner'
    );

    $app->delete(
        '/runner/:id', 'deleteRunner'
    );

    $app->run();
 
?>