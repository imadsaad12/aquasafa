pipeline{
    agent any
    stages{
        stage("building"){
            steps{
               sh 'cd aquasafa'
               nodejs("Node"){
                   sh 'npm install'
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