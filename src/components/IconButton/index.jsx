import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ChatBubbleOutline,
  ChatBubble,
  Send
} from '@material-ui/icons';

const Button = styled.button`
  background: none;
  padding: 0;
  margin: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: 0.3s;

  &.comment {
    transform: translateY(1px);
  }

  svg {
    height: calc(${({ theme }) => theme.font.size} * 2);
    width: auto;
  }
  
  .active {
    fill: ${({ theme }) => theme.colors.highlight};
  }

  svg:not(.active) {
    fill: ${({ theme }) => theme.colors.texts};
  }

  &:not(:active) {
    .only_non_active {
      display: initial;
    }
    .only_active {
      display: none;
    }
  }

  &:active {
    .only_non_active {
      display: none;
    }
    .only_active {
      display: initial;
    }
  }
`;

const IconButton = ({
  type="like",
  active=false,
  action=() => {},
  theme
}) => {
  const [isLike, setLike] = useState(active);

  return <>
    {
      type === "like" && (
        <>
          {
            !isLike && (
              <Button theme={theme} onClick={() => { action(true); setLike(true) }}>
                <FavoriteBorderOutlined />
              </Button>
            )
          }
          {
            isLike && (
              <Button theme={theme} onClick={() => { action(false); setLike(false) }}>
                <FavoriteOutlined className="active" />
              </Button>
            )
          }
        </>
      )
    }
    {
      type === "comment" && (
        <>
          <Button theme={theme} onClick={action} className="comment">
            <ChatBubbleOutline className="only_non_active" />
            <ChatBubble className="only_active active" />
          </Button>
        </>
      )
    }
    {
      type === "share" && (
        <>
          <Button theme={theme} onClick={action}>
            <Send />
          </Button>
        </>
      )
    }
  </>;
};

IconButton.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  action: PropTypes.func,
  theme: PropTypes.object
};

export default IconButton;