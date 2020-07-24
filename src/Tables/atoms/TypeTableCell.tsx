import React, {useCallback} from 'react';
import styled, { css } from 'styled-components';

import Icon from '../../Icons/Icon';

const CellContainer = styled.div<{ cellStyle?: TypeCellStyle, alignment?: TypeCellAlignment }>`
  display: table-cell;
  height: 35px;
  font-family: ${p => p.theme.fontFamily.data};

  ${({theme, cellStyle}) => cellStyle ? css`
    ${theme.typography.table.columns[cellStyle]};
  ` : css`
    ${theme.typography.table.columns['normalImportance']};
  `}

  ${({alignment}) => alignment ? css`
    text-align: ${alignment};
  ` : css`
    text-align: left;
  `}
`

const UnitText = styled.span`
  ${({theme}) => css`
    ${theme.typography.table.columns['unit']};
  `}
`

const CopyToClipboard = styled.button`

  position: relative;
  width: 20px;
  height: 20px;
  background: transparent;
  border: none;
  outline: none;

  // display: flex;
  // justify-content: center;
  // align-items: center;

  svg {
    display: block;
  }
`

interface IProps {
  cellStyle?: TypeCellStyle
  alignment?: TypeCellAlignment
  showUnit?: boolean
  hasCopyButton?: boolean
}

const TypeTableCell : React.FC<IProps> = ({ children, cellStyle = 'normalImportance', alignment = 'left', hasCopyButton, showUnit = false }) => {

  const copyValue = useCallback(() => {
    // Probably best to make this in a universal, re-usable way.
    // Value -> special div with text in -> copy the contents.
    console.log("Feature not implemented yet, sorry!");
  }, [])

  return <CellContainer {...{cellStyle, alignment}}>
    {children}
    { showUnit ? <UnitText>Mb</UnitText> : null }
    { hasCopyButton ? <CopyToClipboard onClick={ copyValue }><Icon icon={'Invalid'} size={ 16 } /></CopyToClipboard> : null }
  </CellContainer>
}

export default TypeTableCell;
