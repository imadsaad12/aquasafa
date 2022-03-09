pipeline{
    agent any
    stages{
        stage("building"){
            steps{
              dir("backend"){
               nodejs("Node"){
                //sh "pwd"
               echo "$pwd"
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