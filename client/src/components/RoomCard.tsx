import React, { useEffect, useRef } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import RoomParticipants from "./RoomParticipants";
import RoomLinks from "./RoomLinks";
import { Room } from "../../../server/express/types/Room";
import { MeetingParticipant } from "../../../server/express/types/MeetingParticipant";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  border: {
    border: "3px solid rgb(44, 106, 168)",
  },
  header: {
    alignItems: "flex-start",
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  headerTitleLink: {
    flexGrow: 1,
    textDecoration: "none",
  },
  headerSubtitle: {
    fontSize: 14,
    paddingTop: 4,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 4,
  },
  avatarGroup: {
    marginLeft: 8,
  },
  actions: {
    display: "flex",
    flexDirection: "row-reverse",
  },
});

interface Props {
  room: Room & { shouldFocus?: boolean };
  participants: MeetingParticipant[];
  isDisabled: boolean;
}

const RoomCard = (props: Props) => {
  const classes = useStyles(props);
  const { room, participants, isDisabled } = props;

  const scrollRef: any = useRef();
  useEffect(() => {
    if (room.shouldFocus) {
      window.scrollTo({ behavior: "smooth", top: scrollRef.current.offsetTop });
    }
  }, [room]);

  function renderJoinUrl() {
    return (
      room.joinUrl &&
      !isDisabled && (
        <Button size="small" color="secondary" variant="text" href={room.joinUrl} target="_blank">
          Join
        </Button>
      )
    );
  }

  return (
    <Card className={`${classes.root} ${room.shouldFocus ? classes.border : ""}`} key={room.roomId} ref={scrollRef}>
      <a className={classes.headerTitleLink} href={room.titleLink} target="_blank" rel="noopener noreferrer">
        <CardHeader
          classes={{ root: classes.header, subheader: `${classes.headerSubtitle}` }}
          avatar={room.icon ? <Avatar variant="square" src={room.icon} /> : undefined}
          title={
            <Typography variant="h5" className={`${classes.headerTitle}`}>
              {room.name}
            </Typography>
          }
          subheader={room.subtitle}
        />
      </a>
      <CardContent className={classes.content}>
        {!isDisabled && <RoomParticipants name={room.name} participants={participants} />}
        <RoomLinks links={room.links} />
      </CardContent>
      <CardActions className={classes.actions}>{renderJoinUrl()}</CardActions>
    </Card>
  );
};
export default RoomCard;
