import React from "react";

let initialState = {
  HostingProvider: "",
  NodeIP: "",
  OperatingSystem: "",
  NodeQualifiedFullHostname: "",
  OperatingSystemVersion: "",
  SSHUsername: "",
  SSHPassword: "",
  PublicKey: "",
  SudoPassword: "",
  SudoOptions: "",
  RootPassword: "",
  TCPPort443: "",
  TCPPort22: "",
  TCPPort5985: "",
  TCPPort5986: "",
  WinRMUsername: "",
  WinRMPassword: "",
  AWSServiceType: "",
  AWSAccessKeyID: "",
  AWSSecretAccessKey: "",
  AzureClientSecret: "",
  AzureTenantID: "",
  GCPServiceAccountJSONCredentials: "", 
};

const reducer = (state, action) => {
  switch (action.type) {
    case "HostingProvider":
      return {
        ...state,
        name: action.payload
      };
    case "NODEIP":
      return {
        ...state,
        NodeIP: action.payload
      };
    case "OperatingSystem":
      return {
        ...state,
        provider: action.payload
      };
    case "NodeQualifiedFullHostname":
      return {
        ...state,
        provider: action.payload
      };
    case "OperatingSystemVersion":
      return {
        ...state,
        provider: action.payload
      };
    case "SSHUsername":
      return {
        ...state,
        provider: action.payload
      };
    case "SSHPassword":
      return {
        ...state,
        provider: action.payload
      };
    case "PublicKey":
      return {
        ...state,
        provider: action.payload
      };
    case "SudoPassword":
      return {
        ...state,
        provider: action.payload
      };
    case "SudoOptions":
      return {
        ...state,
        provider: action.payload
      };
    case "RootPassword":
      return {
        ...state,
        provider: action.payload
      };
    case "TCPPort443":
      return {
        ...state,
        provider: action.payload
      };
    case "TCPPort22":
      return {
        ...state,
        provider: action.payload
      };
    case "TCPPort5985":
      return {
        ...state,
        provider: action.payload
      };
    case "TCPPort5986":
      return {
        ...state,
        provider: action.payload
      };
      case "WinRMUsername":
      return {
        ...state,
        provider: action.payload
      };
    case "WinRMPassword":
      return {
        ...state,
        provider: action.payload
      };
      case "AWSServiceType":
      return {
        ...state,
        provider: action.payload
      };
      case "AWSAccessKeyID":
      return {
        ...state,
        provider: action.payload
      };
      case "AWSSecretAccessKey":
      return {
        ...state,
        provider: action.payload
      };
      case "AzureClientSecret":
        return {
          ...state,
          provider: action.payload
        };
        case "AzureTenantID":
          return {
            ...state,
            provider: action.payload
          };
          case "GCPServiceAccountJSONCredentials":
          return {
            ...state,
            provider: action.payload
          };
    case "CLEAR":
      return {
        HostingProvider: "",
        NodeIP: "",
        OperatingSystem: "",
        NodeQualifiedFullHostname: "",
        OperatingSystemVersion: "",
        SSHUsername: "",
        SSHPassword: "",
        PublicKey: "",
        SudoPassword: "",
        SudoOptions: "",
        RootPassword: "",
        TCPPort443: "",
        TCPPort22: "",
        TCPPort5985: "",
        TCPPort5986: "",
        WinRMUsername: "",
        WinRMPassword: "",
        AWSServiceType: "",
        AWSAccessKeyID: "",
        AWSSecretAccessKey: "",  
        AzureClientSecret: "",
        AzureTenantID: "",  
        GCPServiceAccountJSONCredentials: "",    
      };
    default:
      return state;
  }
};

const Store = (Wrapped) => {
  function Component(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const actions = {
      HostingProvider: (payload) => dispatch({ type: "HostingProvider", payload }),
      NodeIP: (payload) => dispatch({ type: "IP", payload }),
      OperatingSystem: (payload) => dispatch({ type: "OperatingSystem", payload }),
      NodeQualifiedFullHostname: (payload) => dispatch({ type: "NodeQualifiedFullHostname", payload }),
      OperatingSystemVersion: (payload) => dispatch({ type: "OperatingSystemVersion", payload }),
      SSHUsername: (payload) => dispatch({ type: "SSHUsername", payload }),
      SSHPassword: (payload) => dispatch({ type: "SSHPassword", payload }),
      PublicKey: (payload) => dispatch({ type: "PublicKey", payload }),
      SudoPassword: (payload) => dispatch({ type: "SudoPassword", payload }),
      SudoOptions: (payload) => dispatch({ type: "SudoOptions", payload }),
      RootPassword: (payload) => dispatch({ type: "RootPassword", payload }),
      TCPPort443: (payload) => dispatch({ type: "TCPPort443", payload }),
      TCPPort22: (payload) => dispatch({ type: "TCPPort22", payload }),
      TCPPort5985: (payload) => dispatch({ type: "TCPPort5985", payload }),
      TCPPort5986: (payload) => dispatch({ type: "TCPPort5986", payload }),
      WinRMUsername: (payload) => dispatch({ type: "WinRMUsername", payload }),
      WinRMPassword: (payload) => dispatch({ type: "WinRMPassword", payload }),
      AWSServiceType: (payload) => dispatch({ type: "AWSServiceType", payload }),
      AWSAccessKeyID: (payload) => dispatch({ type: "AWSAccessKeyID", payload }),
      AWSSecretAccessKey: (payload) => dispatch({ type: "AWSSecretAccessKey", payload }),
      AzureClientSecret: (payload) => dispatch({ type: "AzureClientSecret", payload }),
      AzureTenantID: (payload) => dispatch({ type: "AzureTenantID", payload }),
      GCPServiceAccountJSONCredentials: (payload) => dispatch({ type: "GCPServiceAccountJSONCredentials", payload }),
      clear: () => dispatch({ type: "CLEAR" })
    };

    return (
      <Context.Provider value={[state, actions]}>
        <Wrapped {...props} />
      </Context.Provider>
    );
  }
  return Component;
};

export const Context = React.createContext(initialState);

export default Store;
