import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface ActionMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  handleDeleteDoc: () => Promise<void>;
  handleRenameDoc: () => Promise<void>;
  handleMoveDoc: () => Promise<void>;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  anchorEl,
  handleClose,
  handleDeleteDoc,
  handleRenameDoc,
  handleMoveDoc,
}) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleDeleteDoc}>Delete</MenuItem>
      <MenuItem onClick={handleRenameDoc}>Rename</MenuItem>
      <MenuItem onClick={handleMoveDoc}>Move</MenuItem>
    </Menu>
  );
};

export default ActionMenu;
