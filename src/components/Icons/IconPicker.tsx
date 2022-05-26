import { Dispatch, FC, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app";
import { loadIcons } from "../../features/event/iconSlice";
import { IIcon } from "../../interfaces/IIcon";

const Icon = styled.img`
    fill: green;
    width: 50px;
    height: 50px;
    margin: 10px;
    cursor: pointer;
`;

const PickerCenter = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Picker = styled.div`
    position: fixed;
    z-index: 1;
    background-color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    width: 400px;
    height: 300px;
`;

type Props = {
    setIcon: Dispatch<SetStateAction<any>>,
    setPickLoaded: Dispatch<SetStateAction<any>>
}

const IconPicker: FC<Props> = ({ setIcon, setPickLoaded }) => {
    const dispatch = useAppDispatch();
    const iconState = useAppSelector(state => state.eventIcon);

    useEffect(() => {

        dispatch(loadIcons())
    }, [dispatch])

    return (
        <PickerCenter>
            <Picker>
                {iconState.loaded && iconState.data.items.map((element) => (
                    // eslint-disable-next-line react/jsx-key
                    <Icon src={element.iconObject.contentUrl} onClick={
                        () => {
                            setIcon(element);
                            setPickLoaded(false);
                        }
                    }/>
                ))}
            </Picker>
        </PickerCenter>
    )
}

export default IconPicker;