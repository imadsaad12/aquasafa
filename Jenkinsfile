pipeline{
    agent any
    stages{
        stage("building"){
            steps{
               sh "pwd"
              dir("backend"){
               nodejs("Node"){
                sh "pwd"
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