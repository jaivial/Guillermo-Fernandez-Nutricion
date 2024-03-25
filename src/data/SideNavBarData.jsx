import React from "react";
import * as AiIcons from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { IoNutrition } from "react-icons/io5";
import { FaWeightScale } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";
import { TbMessage } from "react-icons/tb";


export const SidebarData = [
    {
        title: 'Inicio',
        path: '#',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Sobre Mi',
        path: '#',
        icon: <FaUserDoctor />,
        cName: 'nav-text'
    },
    {
        title: 'Nutrición Clínica',
        path: '#',
        icon: <IoNutrition />,
        cName: 'nav-text'
    },
    {
        title: 'Pérdida de Peso',
        path: '#',
        icon: <FaWeightScale />,
        cName: 'nav-text'
    },
    {
        title: 'Nutrición Deportiva',
        path: '#',
        icon: <GiWeightLiftingUp />,
        cName: 'nav-text'
    },
    {
        title: 'Contacto',
        path: '#',
        icon: <TbMessage />,
        cName: 'nav-text'
    }
]