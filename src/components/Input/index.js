import React from 'react';
import styled from 'styled-components';

const InputBase = styled.input`
    width: 100%;
    padding: 15px;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.constrastText};
    background-color: ${({ theme }) => theme.colors.mainBg};
    border-radius: ${({ theme }) => theme.borderRadius};
    outline: 0;
    margin-bottom: 25px;
`;

export default function Input(props) {
    return (
        <div>
            <InputBase
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
        </div>
    )
}