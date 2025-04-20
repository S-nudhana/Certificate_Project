import { Box, Text } from "@chakra-ui/react";
import Prof_AdminCard from "./Prof_admin/Prof_AdminCard";
import StudentCard from "./Student/StudentCard";

interface Event {
  event_thumbnail: string;
  event_name: string;
  event_owner: string;
  event_startDate: string;
  event_endDate: string;
  event_Id: number;
  event_approve: boolean;
}

interface EventListProps {
  events: Event[];
  title: string;
  message: string;
  role: "professor" | "student" | "admin";
}

const EventList: React.FC<EventListProps> = ({ events, title, message, role }) => {
  return (
    <Box>
      <Text
        fontSize="28px"
        fontWeight="bold"
        textDecoration="underline"
        textUnderlineOffset="2px"
        mt="20px"
      >
        {title}
      </Text>
      {events.length > 0 ? (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent={{ base: "center", md: "space-between", lg: "flex-start" }}
          gap="30px"
          pt="30px"
          maxWidth="1300px"
          mx={{ base: "5%", md: "8%", lg: "3%", xl: "auto" }}
        >
          {role !== "student"
            ? events.map((item, key) => (
                <Prof_AdminCard
                  key={key}
                  event_thumbnail={item.event_thumbnail}
                  event_name={item.event_name}
                  event_owner={item.event_owner}
                  event_startDate={item.event_startDate}
                  event_endDate={item.event_endDate}
                  event_Id={item.event_Id}
                  event_status={item.event_approve || false}
                  role={role}
                />
              ))
            : events.map((item, key) => (
                <StudentCard
                  key={key}
                  event_thumbnail={item.event_thumbnail}
                  event_name={item.event_name}
                  event_startDate={item.event_startDate}
                  event_endDate={item.event_endDate}
                  event_Id={item.event_Id}
                />
              ))}
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="15vh">
          <Text>{message}</Text>
        </Box>
      )}
    </Box>
  );
}

export default EventList;
