import { Icon } from "@iconify/react";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

const Content = styled.div`
    margin-top: 10px;`;

const HrefIcon = styled(Icon)`
    height: 34px;
    width: 34px;
    color: ${props => props.theme.palette.divider};
    cursor: pointer;
    &:hover {
        color: ${props => props.theme.palette.text.hint};
    }
`;

type Props = {
    title: string;
    icon: string;
    href: string;
};

const MenuElement : FC<Props> = ({title, icon, href}) => {
    return (
        <Content>
            <Link href={href} passHref>
                <HrefIcon icon={icon} />
            </Link>
        </Content>
    );
}

export default MenuElement;