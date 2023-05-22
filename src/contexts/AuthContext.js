// O Context consegue manter as informações acessíveis em toda a aplicação, n é necessário 2 páginas como Context e Provider!!
// Podemos juntar em uma página ou uma pasta q acesse as infos do usuário!!
import { createContext } from "react";
export const AuthContext = createContext();