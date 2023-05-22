import { MaterialIcons, AntDesign, MaterialCommunityIcons, FontAwesome5, Ionicons, Entypo, FontAwesome, Fontisto, Feather } from "@expo/vector-icons";

// Resultados da pesquisa na tela  HOMEPAGES.

export default [
    { name: "Guia Médico Hospitalar",iconFamily: FontAwesome5, icon: 'hospital', navlink: 'GuiaMedicoHospitalar' },
    { name: "Profissionais Preferidos",iconFamily: AntDesign, icon: 'staro', navlink: 'ProfissionaisFavoritos' },
    { name: "Boletos", iconFamily: AntDesign, icon: 'barcode', navlink: 'Boletos' },
    { name: "Reembolso", iconFamily: MaterialCommunityIcons, icon: 'cash-refund', navlink: 'EmContrucao' },
    { name: "Renovação de Estudante", iconFamily: FontAwesome5, icon: 'user-graduate', navlink: 'EmContrucao' },
    { name: "Imposto de Renda", iconFamily: FontAwesome5, icon: 'clipboard-list', navlink: 'EmContrucao' },
    { name: "PAC", iconFamily: Ionicons, icon: 'people-sharp', navlink: 'EmContrucao' },
    { name: "PAMES", iconFamily: MaterialCommunityIcons, icon: 'heart-plus', navlink: 'EmContrucao' },
    { name: "Habilitação de Dependentes", iconFamily: FontAwesome5, icon: 'user-plus', navlink: 'HabilitacaoDependentes', iconSize: 6, headingSize: 13, aspectRatio: 1.2 },
    { name: "Optante/Licenciado", iconFamily: FontAwesome5, icon: 'user-alt', iconSize: 6, navlink: 'EmContrucao' },
    { name: "Comunicado de Óbito", iconFamily: MaterialCommunityIcons, icon: 'coffin', navlink: 'EmContrucao' },
    { name: "Carta de Portabilidade", iconFamily: Entypo, icon: 'text-document-inverted', headingSize: 13, navlink: 'EmContrucao' },
    { name: "2ª Via de Cartão", iconFamily: MaterialIcons, icon: 'layers', navlink: 'EmContrucao' },
    { name: "Exame Covid-19 (PCR)", iconFamily: MaterialIcons, icon: 'coronavirus', navlink: 'EmContrucao' },
    { name: "Perícia Presencial", iconFamily: MaterialCommunityIcons, icon: 'clipboard-plus', navlink: 'EmContrucao' },
    { name: "Teleconsulta", iconFamily: FontAwesome, icon: 'stethoscope', navlink: 'EmContrucao' },
    { name: "Guia de Atendimento", iconFamily: Fontisto, icon: 'bed-patient', headingSize: 13, navlink: 'EmContrucao' },
    { name: "Histórico de Atendimento", iconFamily: MaterialCommunityIcons, icon: 'folder-multiple-plus', headingSize: 13, iconSize: 7, navlink: 'EmContrucao' },
    { name: "Cobertura de Honorários", iconFamily: MaterialCommunityIcons, icon: 'account-search', navlink: 'EmContrucao' },
    { name: "Atendimento Presencial", iconFamily: Fontisto, icon: 'person', headingSize: 13, iconSize: 7, navlink: 'EmContrucao' },
  ];