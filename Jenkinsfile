pipeline{
    agent any
    stages{
        stage("building"){
            steps{
              dir("backend"){
               nodejs("Node"){
                   sh 'npm install'
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