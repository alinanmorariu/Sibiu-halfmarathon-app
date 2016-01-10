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

    $app->get(
        '/runners/companies', 'getCompaniesRunners'
    );

    $app->get(
        '/runners/children', 'getChildrenRunners'
    );

    $app->get(
        '/runners/all', 'getAllRunners'
    );

    $app->get(
        '/fundraisers', 'getFundraisers'
    );

    $app->get(
        '/runner/:id', 'getRunner'
    );

    $app->post(
        '/runners/adults', 'addRunner'
    );

    $app->post(
        '/runners/relay2', 'addListOfRunners'
    );

    $app->post(
        '/runners/relay4', 'addListOfRunners'
    );

    $app->post(
        '/runners/company', 'addListOfRunners'
    );

    $app->post(
        '/runners/children', 'addRunner'
    );

    $app->put(
        '/runner/:id', 'updateRunner'
    );

    $app->delete(
        '/runner/:id', 'deleteRunner'
    );

    $app->run();
 
?>