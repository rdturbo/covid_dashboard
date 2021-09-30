import React from "react";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Icon,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import HomeSVG from "../../../images/sideMenuIcons/home.svg";
import IndiaSVG from "../../../images/sideMenuIcons/india.svg";
import UsaSVG from "../../../images/sideMenuIcons/usa.svg";
import IllusSVG from "../../../images/sideMenuIcons/illustrations.svg";

interface Props {
  isMenuOpen: boolean;
  toggleIsMenuOpen: Function;
}

const SideMenu: React.FC<Props> = (props) => {
  return (
    <Drawer open={props.isMenuOpen} onClose={() => props.toggleIsMenuOpen()}>
      <List component="nav">
        <div className="flex-row sidebar-margin">
          <Typography variant="h2" align="center" className="text--light">
            Welcome
          </Typography>
        </div>

        <Link to="/">
          <ListItem button>
            <ListItemIcon className="menu-icon-section">
              <Icon className="menu-icon-container">
                <img src={HomeSVG} alt="home" className="menu-icon" />
              </Icon>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5">Home</Typography>
            </ListItemText>
          </ListItem>
        </Link>

        <a href="https://nuirupayandas-ask-me-anything.netlify.app/">
          <ListItem button>
            <ListItemIcon className="menu-icon-section">
              <Icon className="menu-icon-container">
                <img src={UsaSVG} alt="usa_county" className="menu-icon" />
              </Icon>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5">Ask me anything</Typography>
            </ListItemText>
          </ListItem>
        </a>

        <Link to="/country-usa">
          <ListItem button>
            <ListItemIcon className="menu-icon-section">
              <Icon className="menu-icon-container">
                <img src={IndiaSVG} alt="usa_county" className="menu-icon" />
              </Icon>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5">USA</Typography>
            </ListItemText>
          </ListItem>
        </Link>

        <Link to="/country-india">
          <ListItem button>
            <ListItemIcon className="menu-icon-section">
              <Icon className="menu-icon-container">
                <img src={IllusSVG} alt="home" className="menu-icon" />
              </Icon>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5">India</Typography>
            </ListItemText>
          </ListItem>
        </Link>

        <Link to="/illustration">
          <ListItem button>
            <ListItemIcon className="menu-icon-section">
              <Icon className="menu-icon-container">
                <img src={UsaSVG} alt="financial_path" className="menu-icon" />
              </Icon>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5">Covid 19 Illustration</Typography>
            </ListItemText>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default SideMenu;
