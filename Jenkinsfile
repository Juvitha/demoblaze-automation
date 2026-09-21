pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
        jdk 'JDK17'
    }

    environment {
        BASE_URL = 'https://demoblaze.com'
        CI = 'true'
        JAVA_HOME = tool 'JDK17'
        PATH = "${tool 'NodeJS'};${tool 'JDK17'}\\bin;${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                bat 'node -v'
                bat 'npm ci'
                bat 'npx playwright install chromium'
            }
        }

        stage('Test') {
            steps {
                bat 'npx playwright test --reporter=list --workers=1'
            }
        }
    }

    post {
        always {
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
    }
}