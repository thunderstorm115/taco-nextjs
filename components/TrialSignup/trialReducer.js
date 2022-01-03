const initialState = {
    email: '',
    password: '',
    companyName: '',
    companyRegNo: '',
    companyVatNo: '',
    hostingEnvironment: '',
    tcpCheck: false,
    os: 'Redhat',
    osVersion: '',
    ipAddress: '',
    hostname: '',
    serviceAccount: '',
    tenantID: '',
    clientSecret: '',
    serviceType: '',
    awsAccessKeyId: '',
    awsSecreteAccessKey: '',
    tcpPort: '',
    winRMUsername: '',
    winRMPassword: '',
    SSHUsername: '',
    SSHPassword: '',
    publicKey: '',
    sudoPassword: '',
    sudoOptions: '',
    rootPassword: ''
}

const reducer = (state, action) => {

    switch(action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            }
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.payload
            }
        case 'SET_COMPANY_NAME':
            return {
                ...state,
                companyName: action.payload
            }
        case 'SET_COMPANY_REG':
            return {
                ...state,
                companyRegNo: action.payload
            }
        case 'SET_COMPANY_VAT':
            return {
                ...state,
                companyVatNo: action.payload
            }
        case 'SET_HOSTING_ENVIRONMENT':
            return {
                ...state,
                hostingEnvironment: action.payload
            }
        case  'SET_TCP_CHECKED':
            return {
                ...state,
                tcpCheck: action.payload
            }
        case 'SET_OS':
            return {
                ...state,
                os: action.payload
            }
        case 'SET_OS_VERSION':
            return {
                ...state,
                osVersion: action.payload
            }
        case 'SET_IP_ADDRESS':
            return {
                ...state,
                ipAddress: action.payload
            }
        case 'SET_HOSTNAME':
            return {
                ...state,
                hostname: action.payload
            }

        case 'SET_SERVICE_ACCOUNT':
            return {
                ...state,
                serviceAccount: action.payload
            }
        case 'SET_TENANT_ID':
            return {
                ...state,
                tenantID: action.payload
            }
        case 'SET_CLIENT_SECRET':
            return {
                ...state,
                clientSecret: action.payload
            }
        case 'SET_SERVICE_TYPE':
            return {
                ...state,
                serviceType: action.payload
            }
        case 'SET_AWS_AKID':
            return {
                ...state,
                awsAccessKeyId: action.payload
            }
        case 'SET_AWS_SAK':
            return {
                ...state,
                awsSecreteAccessKey: action.payload
            }
        case 'SET_TCP':
            return {
                ...state,
                tcpPort: action.payload
            }
        case 'SET_WINRM_USERNAME':
            return {
                ...state,
                winRMUsername: action.payload
            }
        case 'SET_WINRM_PASSWORD':
            return {
                ...state,
                winRMPassword: action.payload
            }
        case 'SET_SSH_USERNAME':
            return {
                ...state,
                SSHUsername: action.payload
            }
        case 'SET_SSH_PASSWORD':
            return {
                ...state,
                SSHPassword: action.payload
            }
        case 'SET_PUBLIC_KEY':
            return {
                ...state,
                publicKey: action.payload
            }
        case 'SET_SUDO_PASSWORD':
            return {
                ...state,
                sudoPassword: action.payload
            }
        case 'SET_SUDO_OPTIONS':
            return {
                ...state,
                sudoOptions: action.payload
            }
        case 'SET_ROOT_PASSWORD':
            return {
                ...state,
                rootPassword: action.payload
            }
        case 'CLEAR_SECURITY_DETAILS':
            return {
                ...state,
                rootPassword: '',
                sudoOptions:'',
                sudoPassword: '',
                publicKey: '',
                SSHPassword: '',
                SSHUsername: '',
                winRMPassword: '',
                winRMUsername: '',
                tcpPort: ''
            }
        case 'CLEAR_STATE':
            return initialState;
        default:
            return state;
    }
}

export default reducer;