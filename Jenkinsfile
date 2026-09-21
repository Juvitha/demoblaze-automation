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
        PATH = "${tool 'NodeJS'}/bin:${tool 'JDK17'}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'node -v'
                sh 'npm ci'
                sh 'npx playwright install chromium'
            }
        }

        stage('Test') {
            steps {
                sh 'npx playwright test --reporter=list --workers=1'
            }
        }
    }

    post {
        always {
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
    }
}