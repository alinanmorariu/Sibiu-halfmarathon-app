<?php
// Access the DB tables and get lists
 function getListByCriteria($tableName, $criteria, $tableColumn) {
          $sql = "select * FROM $tableName WHERE $criteria ORDER BY $tableColumn";
          try {
            $db = getConnection();
            $stmt = $db->query($sql);  
            $list = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $db = null;
            echo json_encode(utf8ize($list), JSON_NUMERIC_CHECK);
          } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
          }
        }

 function getList($tableName, $tableColumn) {
          $sql = "select * FROM $tableName ORDER BY $tableColumn";
          try {
            $db = getConnection();
            $stmt = $db->query($sql);  
            $list = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $db = null;
            echo json_encode(utf8ize($list), JSON_NUMERIC_CHECK);
          } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
          }
        }

//Get all projects
    function getProjects () { 
        echo getList('PROIECTE', 'proiectID');
    }

//Get runners
    function getAllAdultRunners () {
        echo getListByCriteria('ALERGATORI', 'cursa = "1" OR cursa = "2" OR cursa = "3" OR cursa = "4"', 'timestamp');
    }

    function getSmRunners () { 
        echo getListByCriteria('ALERGATORI', 'cursa = "1"', 'timestamp');
    }

    function getCrossRunners () { 
        echo getListByCriteria('ALERGATORI', 'cursa = "2"', 'timestamp');
    }

    function getRelay4Runners () { 
        echo getListByCriteria('ALERGATORI', 'cursa = "3"', 'timestamp');
    }

    function getRelay2Runners () { 
        echo getListByCriteria('ALERGATORI', 'cursa = "4"', 'timestamp');
    }

    function getCompaniesRunners () { 
        echo getListByCriteria('ALERGATORI', 'companie != ""', 'timestamp');
    }

?>