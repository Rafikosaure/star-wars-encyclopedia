pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }
    
    environment {
        MONGODB_USER = 'rafikbensadi'
        MONGODB_PASSWORD = 'qMNiOQbE8sgznUba'
        PORT = 8000
        TOKEN = 'iRFSkLbscB63tzd3m0QJEFvAd8Iu1VGizxtmkXqLQkcTt10twcigFYE9EZdGuMsgmkLjcBGjkfZ72aZ6xeZJ0C8DmIdXSWdEeAcCfuKIAc4DC0GHZ1vIkvckUdFAD4M'
        API_KEY = "41c45185-a5f9-44d0-b12a-5b70a7bc5b88:fx"
        NB_HASH = 10
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
