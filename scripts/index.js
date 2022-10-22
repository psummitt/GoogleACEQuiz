const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
let score

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    score = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        score = 0 
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        updateScore()
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function updateScore() {
    score = score + 1
    document.getElementById('scoreLabel').innerHTML = "score: " + score
}

const questions = [
    {
        question: "What GCP service is Google’s platform-as-a-service offering?",
        answers: [
            { text: 'Compute Engine', correct: false },
            { text: 'Cloud Spanner', correct: false },
            { text: 'App Engine', correct: true },
            { text: 'Kubernetes Engine', correct: false },
        ]
    },
    {
        question: 'What GCP storage service would you use to store unstructured data?',
        answers: [
            { text: 'Cloud Storage', correct: true },
            { text: 'DataProc', correct: false },
            { text: 'DataStore', correct: false },
            { text: 'BigQuery', correct: false },
        ]
    },
    {
        question: 'What GCP service provides managed analytic and data warehousing services?',
        answers: [
            { text: 'Cloud Spanner', correct: false },
            { text: 'Cloud SQL', correct: false },
            { text: 'Big Query', correct: true },
            { text: 'Cloud Dataflow', correct: false },
        ]
    },
    {
        question: 'Which of the following is not possible using Security Command Center?',
        answers: [
            { text: 'Gather usage metrics regarding the resources in your Google Cloud environment.', correct: true },
            { text: 'Identify potential botnet activity on your network.', correct: false },
            { text: 'Uncover common vulnerabilities such as SQL injection attacks.', correct: false },
            { text: 'Get a full list of assets in your Google Cloud environment.', correct: false },
        ]
    },
    {
        question: 'Which of the following is the best option to enable if you want to define alerts on your resources if a health check fails?',
        answers: [
            { text: 'Cloud Trace', correct: false },
            { text: 'Cloud Debugger', correct: false },
            { text: 'Cloud Monitoring', correct: true },
            { text: 'Cloud Functions', correct: false },
        ]
    },
    {
        question: 'Which of the following types of resources can a Service Account Role be applied to?',
        answers: [
            { text: 'Virtual Machine', correct: true },
            { text: 'Google Group', correct: false },
            { text: 'Folder', correct: false },
            { text: 'User', correct: false },
        ]
    },
    {
        question: 'What is the best way to organize projects that need to share the same policy?',
        answers: [
            { text: 'Place the policy on the organization so it will apply to the projects simultaneously.', correct: false },
            { text: 'Consolidate the resources into one project and apply the policy to the single project.', correct: false },
            { text: 'Place each project in an individual folder and apple the same policy on each folder.', correct: false },
            { text: 'Place both projects into a folder and apply the policy on the folder.', correct: true },
        ]
    },
    {
        question: 'Which of the following provides access control to Google Cloud Resources?',
        answers: [
            { text: 'Permissions', correct: false },
            { text: 'Roles', correct: false },
            { text: 'Firewall Rules', correct: false },
            { text: 'Policies', correct: true },
        ]
    },
    {
        question: 'You are onboarding a new engineer who will be in charge of compute engine resources. Which of the following roles should you grant this user?',
        answers: [
            { text: 'Compute Editor', correct: false },
            { text: 'Build a custom role for this user.', correct: false },
            { text: 'Compute Admin Role', correct: true },
            { text: 'Owner', correct: false },
        ]
    },
    {
        question: 'Which of the following services is the customer responsible for configuring, administering, and monitoring?',
        answers: [
            { text: 'Google App Engine', correct: false },
            { text: 'Google Cloud Functions', correct: false },
            { text: 'G Suite', correct: false },
            { text: 'Google Compute Engine', correct: true },
        ]
    },
    {
        question: 'Which of the following statements are true when it comes to Google VPC networks and their subnets?',
        answers: [
            { text: 'Networks and subnets are global resources.', correct: false },
            { text: 'Networks are a global resource; subnets are a zonal resource.', correct: false },
            { text: 'Networks are a global resource; subnets are a regional resource.', correct: true },
            { text: 'Networks are a regional resource; subnets are a zonal resource.', correct: false },
        ]
    },
    {
        question: 'How can you control the traffic coming into instances in your Google Cloud Network?',
        answers: [
            { text: 'Use separate VPCs.', correct: false },
            { text: 'Use firewall rules.', correct: true },
            { text: 'Use multiple instances.', correct: false },
            { text: 'Use policies.', correct: false },
        ]
    },
    {
        question: 'The IT team for a university is moving some documents and databases to Google Cloud Platform. They want to ensure maximum control over the encryption process of data stored at rest in Cloud Storage. Which technique should the IT Team use?',
        answers: [
            { text: 'Customer-supplied encryption keys (CSEK)', correct: true },
            { text: 'VPN', correct: false },
            { text: 'Customer-managed encryption keys (CMEK)', correct: false },
            { text: 'Cloud Key Management Service (Cloud KMS)', correct: false },
        ]
    },
    {
        question: 'Which of the following is true about making changes to an object stored in Cloud Storage?',
        answers: [
            { text: 'Objects are immutable and therefore you must upload a new version to overwrite the existing one.', correct: true },
            { text: 'Objects are immutable and will be versioned by default.', correct: false },
            { text: 'Objects are only immutable if you enabled in the gcloud command line.', correct: false },
            { text: 'You can open the object in the Google Cloud UI and edit in the browser.', correct: false },
        ]
    },
    {
        question: 'What is on-demand resource provisioning?',
        answers: [
            { text: 'Provisioning (renting) resources when you want them and releasing them back to the cloud when you do not need them.', correct: true },
            { text: 'Buying servers with upfront planning.', correct: false },
        ]
    },
    {
        question: 'Which of these statements about a Region is TRUE?',
        answers: [
            { text: 'GCP has Regions only in one country.', correct: false },
            { text: 'GCP has Regions across different continents.', correct: false },
            { text: 'GCP has Regions only in one continent.', correct: true },
        ]
    },
    {
        question: 'Which of these is an availability zone in the region of the The Dalles, Oregon, North America - us-west1?',
        answers: [
            { text: 'us-west1-a', correct: true },
            { text: 'europe-north1-a', correct: false },
        ]
    },
    {
        question: 'Which of these are the advantages of the Cloud?',
        answers: [
            { text: 'Trade capital expense for variable expense.', correct: false },
            { text: 'Benefit from massive economies of scale.', correct: false },
            { text: 'Stop guessing capacity', correct: false },
            { text: 'All of the above.', correct: true },
        ]
    },
    {
        question: 'How can you get high availability for global applications?',
        answers: [
            { text: 'Distribute virtual servers across multiple regions and multiple zones.', correct: true },
            { text: 'Deploy virtual servers to a Single Region.', correct: false },
            { text: 'Deploy virtual servers to a Single Zone.', correct: false },
        ]
    },
    {
        question: 'TRUE or FALSE: Managed instance group can contain VM\'s created with different machine types?',
        answers: [
            { text: 'True', correct: false },
            { text: 'False', correct: true },
        ]
    },
    {
        question: 'TRUE or FALSE: Managed instance group provides self-healing and auto-scaling capabilities?',
        answers: [
            { text: 'True', correct: true },
            { text: 'False', correct: false },
        ]
    },
    {
        question: 'Which of these configuration options can prevent frequent scaling operations in a MIG?',
        answers: [
            { text: '--health-check', correct: false },
            { text: '--cool-down-period', correct: true },
        ]
    },
    {
        question: 'I want to make a new release without a reduction in capacity. Which of these options should I configure with a value of 0?',
        answers: [
            { text: '--max-surge', correct: false },
            { text: '--max-unavailable', correct: true },
            { text: '--max-num-replicas', correct: false },
        ]
    },
    {
        question: 'You\'ve freshly installed gcloud in your machine, and now you want to link it with your account. How do you perform the authentication process?',
        answers: [
            { text: 'Use the gcloud authenticate command, and enter your project\'s IAM Service Account private key.', correct: false },
            { text: 'Use gcloud config set account command to add your account.', correct: false },
            { text: ' Use the gcloud init command, and enter your Google Account credentials.', correct: true },
            { text: ' Use the gcloud auth activate-service-account command, and pass your IAM Service Account key file.', correct: false },
        ]
    },
    {
        question: 'Why are alpha and beta command groups separated from other command groups in gcloud?',
        answers: [
            { text: 'Alpha and beta command groups are featured so that users can easily access them.', correct: false },
            { text: 'Alpha and beta command groups are not final and may change in the future.', correct: true },
            { text: 'Alpha and beta command groups need extra higher permissions in order to execute.', correct: false },
            { text: 'Alpha and beta command groups are more expensive to execute than other normal commands.', correct: false },
        ]
    },
    {
        question: 'You\'re using the Cloud Shell and you have an HTML file in it that you are editing. How do you serve it and view your changes through a web browser?',
        answers: [
            { text: 'Use Cloud Shell\'s pre-installed gcloud SDK to create a Compute Engine instance, and securely transfer the HTML file to it.', correct: false },
            { text: 'Securely download the HTML file through the Cloud Shell "Download File" feature, and open it locally in a web browser.', correct: false },
            { text: 'Use Cloud Shell\'s pre-installed gcloud SDK to symlink a Google Cloud Storage URL endpoint to the HTML file, and use the GCS URL in a web browser.', correct: false },
            { text: 'Use Cloud Shell\'s "Web Preview" feature, and access the file through the preview URL endpoint.', correct: true },
        ]
    },
    {
        question: 'Your deployed application on GCP was working fine for several weeks, and suddenly today there are unexpected errors when trying to reach it. How do you quickly verify if the cause is an issue with your application or with Google Cloud services?',
        answers: [
            { text: 'Verify that your application is accessible from another machine through Google Cloud Shell.', correct: false },
            { text: 'Check the Google Cloud Twitter account for announcements on GCP issues.', correct: false },
            { text: 'Submit a support ticket with the "Priority 1" label on Google Cloud\'s Support tool.', correct: false },
            { text: 'Check the Google Cloud Status card in the Google Cloud Console Dashboard to verify if GCP is having known issues.', correct: true },
        ]
    },
    {
        question: 'How do we use our own SSL certificate for HTTPS for our custom domain?',
        answers: [
            { text: 'Disable Google-managed certificates, and upload our own SSL certificate and private key.', correct: true },
            { text: 'We can only use one type of SSL security at a time. Either custom or Google-managed.', correct: false },
            { text: 'Generate a signature using openssl tools and add it to our app.yaml file. For deployments, use the gcloud app deploy app.yaml --certificate=provided command.', correct: false },
            { text: 'Enable the LetsEncrypt API in App Engine settings, and use the Custom SSL form to upload our certificate.', correct: false },
        ]
    },
    {
        question: 'Our App Engine app is now ready to be launched, and we want to use a custom domain name for it. However, we bought the domain name outside of Google Domains from another DNS provider. How do we link our custom domain?',
        answers: [
            { text: 'Verify ownership of the domain using Google Webmaster Tools, and link it through the Custom Domains Setting in our App Engine app.', correct: true },
            { text: 'Initiate a DNS transfer request using BIND protocol from your DNS provider to Google Cloud Domains. Once the domain name appears in the Custom Domains option, activate it for our App Engine app.', correct: false },
            { text: 'Edit the nameserver settings of the domain name, and point it to the official Google Cloud Nameservers. Link the domain through the Custom Domains Setting in our App Engine app.', correct: false },
            { text: 'Add the CNAME entry provided by Google Cloud for our account to the domain name DNS settings. Once the domain name appears in the Custom Domains option, activate it for our App Engine app.', correct: false },
        ]
    },
    {
        question: 'Our App Engine app is working and accessible locally, but when we deploy it using gcloud app deploy app.yaml, and try to access it online, it is returning a Bad Gateway error. What could be the issue?',
        answers: [
            { text: 'The latest App Engine version is not yet promoted. Promote it by running gcloud app versions migrate latest.', correct: false },
            { text: 'Our app is listening to a hardcoded port number instead of the PORT environment variable.', correct: true },
            { text: 'Our app should listen to the port provided by App Engine through the PORT environment variable at runtime.', correct: false },
            { text: 'The DNS record propagation has not yet completed. Wait a few minutes before trying again.', correct: false },
        ]
    }
    
] 