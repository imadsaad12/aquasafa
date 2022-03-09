pipeline{
    agent any
    stages{
        stage("building"){
            steps{

              dir ('aquasafa') {
                  nodejs("Node"){
                   bat 'npm install'
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