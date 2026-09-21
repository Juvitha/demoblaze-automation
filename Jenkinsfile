pipeline {
    agent any

    environment {
        BASE_URL = 'https://demoblaze.com'
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install chromium'
            }
        }
        stage('Test') {
            steps {
                bat 'if exist allure-results rmdir /s /q allure-results'
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
    }
}