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
        stage('Check Tools') {
            steps {
                bat 'node -v'
                bat 'npm -v'
                bat 'java -version'
                bat 'echo %JAVA_HOME%'
                bat 'echo %PATH%'
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
                bat 'npx playwright test'
            }
        }
        stage('Allure Report') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}
