<?php
require_once 'controller.php';
class Log extends Controller
{
  function retrieveLogs (){
        $this->setStatement("SELECT * FROM `hr_logs`");
        $this->statement->execute();
        return $this->statement->fetchAll();
  }
}