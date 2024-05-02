import * as AiIcons from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { IoNutrition } from "react-icons/io5";
import { FaWeightScale } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";
import { TbMessage } from "react-icons/tb";
import { FaHeartbeat } from "react-icons/fa";

export const SidebarData = [
    {
        title: 'Inicio',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Sobre Mi',
        path: '/sobremi',
        icon: <FaUserDoctor />,
        cName: 'nav-text'
    },
    {
        title: 'Nutrición Clínica',
        path: '/nutricionclinica',
        icon: <FaHeartbeat />,
        cName: 'nav-text'
    },
    {
        title: 'Pérdida de Peso',
        path: '/perdidadepeso',
        icon: <FaWeightScale />,
        cName: 'nav-text'
    },
    {
        title: 'Nutrición Deportiva',
        path: '/nutriciondeportiva',
        icon: <GiWeightLiftingUp />,
        cName: 'nav-text'
    },
    {
        title: 'Hábitos Alimentarios',
        path: '/habitosalimentarios',
        icon: <IoNutrition />,
        cName: 'nav-text'
    },
    {
        title: 'Contacto',
        path: '/contacto',
        icon: <TbMessage />,
        cName: 'nav-text'
    }
]