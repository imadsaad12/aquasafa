pipeline{
    agent any
    stages{
        stage("building"){
            steps{
               echo "$WORKSPACE"
               //bat("dir /B ${myDir}")
              dir("\/aquasafa"){
               nodejs("Node"){
                //sh "pwd"
               echo "$WORKSPACE"
               
               }
              }
            }
        }
        stage("testing"){
            steps{
                echo "========testing Application========"
            }
        }
    }
   
}