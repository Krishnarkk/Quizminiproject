import React, { useContext, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Fade,
  Container,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { QuestionContext } from "../Navbar/QuestionContext";
import { useNavigate } from "react-router-dom";
import UsersData from "./UsersData";
import BasicPie from "./BasicPie";
import QuestionImg from "../../assets/questionMark.png";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { questions } = useContext(QuestionContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const qCount = questions.length;
  const allUsers = localStorage.getItem("users");
  const allUsersArray = JSON.parse(allUsers) || [];
  const allUsersLength = allUsersArray.length;
  const navigate = useNavigate();

  const getTotalAnswersCount = (questions) => {
    return questions.reduce(
      (total, question) => total + question.answers.length,
      0
    );
  };
  const totalAnswers = getTotalAnswersCount(questions);

  const getNewUsersThisWeek = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const today = new Date();
    const userCounts = Array(7).fill(0);
    users.forEach((user) => {
      const registeredDate = new Date(user.registeredAt);
      const dayOfWeek = registeredDate.getDay();
      const isThisWeek =
        registeredDate.getFullYear() === today.getFullYear() &&
        registeredDate.getMonth() === today.getMonth() &&
        registeredDate.getDate() >= today.getDate() - today.getDay() &&
        registeredDate.getDate() <= today.getDate();

      if (isThisWeek) {
        userCounts[dayOfWeek] += 1;
      }
    });
    return userCounts;
  };

  const newUsersThisWeek = getNewUsersThisWeek();

  const chartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "User Growth",
        data: newUsersThisWeek,
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
    ],
  };

  const data = [
    {
      title: "Questions",
      value: qCount,
      theme: "linear-gradient(45deg, #c206c8, #8e44ad)",
      pic:QuestionImg
    },
    {
      title: "Answers",
      value: totalAnswers,
      theme: "linear-gradient(45deg, #f39c12, #f1c40f)",
      pic:""
    },
    {
      title: "Users",
      value: allUsersLength,
      theme: "linear-gradient(45deg, #c80683, #e74c3c)",
      pic:""
    },
    {
      title: "New Users Today",
      value: newUsersThisWeek[new Date().getDay()] || 0,
      theme: "linear-gradient(45deg, #00bcd4, #1e88e5)",
      pic:""
    },
  ];

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: Math.max(10, ...newUsersThisWeek),
        ticks: {
          callback: function (value) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(value) ? value : "";
          },
        },
      },
    },
  };

  const handleNavigation = (data) => {
    switch (data.title) {
      case "Questions":
      case "Answers":
        navigate("/question-answers");
        break;
      case "Users":
        setIsDialogOpen(true);
        break;
      default:
        navigate("/");
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin="10px 0px 10px 0px"
      >
        <Typography variant="h3">Dashboard</Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {data.map((item, index) => (
          <Grid item xs={12} sm={4} md={3} key={index}>
            <Fade in={true} timeout={(index + 1) * 1000}>
              <Card
                variant="outlined"
                sx={{
                  background: item.theme,
                  cursor: "pointer",
                  boxShadow: 8,
                  borderRadius: 1,
                  transition: "transform 2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.07)",
                  },
                }}
                onClick={() => handleNavigation(item)}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bolder", color: "white" }}
                  >
                    {item.title}
                  </Typography>
                 {/* <img src={item?.pic}/> */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    position="relative"
                    sx={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={(item.value / 200) * 100}
                      size={43}
                      color="success"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1,
                      }}
                    />
                    <Typography
                      variant="h5"
                      color="white"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontWeight: "bold",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Box marginTop={4} sx={{ padding: "52px" }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Line Chart */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h5" component="div" textAlign="center">
              Users Growth Over Day
            </Typography>
            <Box width="100%" height={200}>
              <Line data={chartData} options={chartOptions} />
            </Box>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h5" component="div" textAlign="center">
              Questions Distribution by Category
            </Typography>
            <Box width="100%" height={200}>
              <BasicPie allQuestions={questions} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <UsersData isDialogOpen={isDialogOpen} onClose={handleCloseDialog} />
    </Container>
  );
};

export default Dashboard;


