// pipeline{
//     agent any
//     stages{
//         stage("building"){
//             steps{
//                  dir ("aquasafa"){
//                 nodejs("Node"){
//                       sh 'yarn install'
//                      // sh 'yarn run test'
//                  }
//                 }
//                  dir ("backend"){
//                 nodejs("Node"){
//                       sh 'yarn install'
//                      // sh 'yarn run test'
//                  }
//                 }
//             }
//         }
//         // stage("building"){
//         //     steps{
//         //           nodejs("Node"){
//         //               sh 'docker compose up'
//         //       }
//         //     }
//         // }
//         stage("testing"){
//             steps{
//                 dir ("aquasafa"){
//                 nodejs("Node"){
//                       sh 'yarn run test'
//               }
//                 }
//             }
//         }
//     }
   
// }


// pipeline {
// environment {
// registry = "isdocker12/aqua-safa"
// registryCredential = 'dockerhub'
// dockerImage = ''
// }
// agent any
// stages {
// // stage('Cloning our Git') {
// // steps {
// // git 'https://github.com/YourGithubAccount/YourGithubRepository.git'
// // }
// // }
// stage('Building our image') {
// steps{
// script {
// dockerImage = docker.build registry + ":$BUILD_NUMBER"
// }
// }
// }
// stage('Deploy our image') {
// steps{
// script {
// docker.withRegistry( '', registryCredential ) {
// dockerImage.push()
// }
// }
// }
// }
// stage('Cleaning up') {
// steps{
// sh "docker rmi $registry:$BUILD_NUMBER"
// }
// }
// }
// }
pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
		HEROKU_CREDENTIALS=credentials('HerokuCli')
	}
	stages {
		stage('Build') {
			steps {
                dir ('backend'){
				//sh 'docker build -t isdocker12/aqua-safa:latest .'
				echo 'done'
                }
			}
		}
		stage('Login') {
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
				sh '(echo "$HEROKU_CREDENTIALS_EMAIL" echo "$HEROKU_CREDENTIALS_PASSWORD") | heroku login'
			}
		}
		// stage('Push') {
		// 	steps {
		// 		//sh 'docker push isdocker12/aqua-safa:latest'
		// 	}
		// }
	}
}