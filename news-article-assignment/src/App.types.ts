export interface AppProps {
    title: string;
  }
  
  export interface Name {
    first: string;
    last: string;
  }
  
  export interface Login {
    uuid: string;
  }
  
  export interface Users {
    name: Name;
    login: Login;
    email: string;
  }

  export interface Articles {
    id: string;
    title: string;
    summary: string[];
    articleDate: string;
    publisher: string;
    createdAt: string;
    updatedAt: string | null;
  }