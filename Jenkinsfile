pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('Recup Git') {
            steps {
                git branch: 'dev', url: 'https://github.com/Rafikosaure/star-wars-blog.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('star-wars-backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                dir('star-wars-backend') {
                    sh 'npm test'
                }
            }
        }
    }
}
