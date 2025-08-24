import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Award, UserPlus, Clock, MapPin } from "lucide-react";
import MeetTeam from "../../components/user/MeetTeam"; // ✅ import MeetTeam
import JoinClub from "../../components/user/JoinClub";


// Dummy data for clubs
const clubsData = [
  {
    id: "debating",
    name: "Debating Club",
    description: "The Debating Club is a dynamic community where students develop critical thinking, public speaking, and argumentation skills. We participate in inter-college debates, host workshops on rhetoric and persuasion, and provide a platform for discussing important social issues. Our members learn to construct compelling arguments, think on their feet, and communicate effectively in formal and informal settings.",
    detailedDescription: "At the Debating Club, we believe that the ability to articulate ideas clearly and persuasively is one of the most valuable skills anyone can develop. Our weekly meetings include practice debates, speech drills, and analysis of famous speeches and debates. We compete in regional and national tournaments, and our members have consistently won awards for their oratory skills. Whether you're an experienced debater or completely new to public speaking, you'll find a supportive environment to grow and challenge yourself. Join us to find your voice, defend your ideas, and engage with diverse perspectives on important issues.",
    team: [
      { role: "President", name: "Sarah Johnson", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
      { role: "Vice President", name: "Michael Chen", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
      { role: "Head of Competitions", name: "Emily Rodriguez", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
      { role: "Training Coordinator", name: "David Kim", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
      { role: "Public Relations", name: "Jessica Williams", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
      { role: "Events Manager", name: "Daniel Brown", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face" },
    ],
    events: [
      { 
        id: 1,
        title: "Annual Inter-College Debate", 
        date: "2025-09-15", 
        time: "10:00 AM - 4:00 PM",
        location: "Main Auditorium",
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=250&fit=crop",
        description: "Witness the most anticipated debating event of the year with teams from across the region."
      },
      { 
        id: 2,
        title: "Public Speaking Workshop", 
        date: "2025-08-20", 
        time: "2:00 PM - 5:00 PM",
        location: "Conference Room A",
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1551818255-e6e109c4c5f9?w=400&h=250&fit=crop",
        description: "Learn techniques to overcome stage fright and deliver compelling speeches."
      },
    ],
    achievements: [
      "National Debate Champions 2024",
      "Hosted the largest collegiate debate tournament in the state",
      "Published debate handbook used by 20+ schools",
      "Members selected for national debating team"
    ]
  },
  {
    id: "cultural",
    name: "Cultural Club",
    description: "The Cultural Club celebrates diversity and artistic expression through a wide range of activities including music, dance, theater, and visual arts. We provide a platform for students to showcase their talents, learn new artistic skills, and appreciate different cultural traditions. Our events range from intimate workshops to large-scale performances that bring together the entire campus community.",
    detailedDescription: "Our Cultural Club is a melting pot of creativity where students from all backgrounds come together to share and celebrate diverse art forms. We organize regular workshops in various dance forms, music instruments, theater acting, and visual arts. Our annual cultural festival is the highlight of the campus calendar, featuring performances, art exhibitions, and food from around the world. We also collaborate with local artists and cultural organizations to provide unique learning opportunities. Whether you're an experienced artist or just beginning to explore your creative side, you'll find a welcoming community and opportunities to grow.",
    team: [
      { role: "President", name: "Diana Lee", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&h=200&fit=crop&crop=face" },
      { role: "Vice President", name: "Evan Garcia", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face" },
      { role: "Creative Director", name: "Fay Wray", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
      { role: "Performance Head", name: "Grace Hopper", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
      { role: "Visual Arts Coordinator", name: "Henry Moore", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face" },
      { role: "Music Director", name: "Isabella Rossi", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face" },
    ],
    events: [
      { 
        id: 1,
        title: "Annual Cultural Festival", 
        date: "2025-10-05", 
        time: "12:00 PM - 8:00 PM",
        location: "University Quad",
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=250&fit=crop",
        description: "Experience a day of diverse cultural performances, food, and art from around the world."
      },
      { 
        id: 2,
        title: "International Music Night", 
        date: "2025-09-22", 
        time: "7:00 PM - 10:00 PM",
        location: "Main Auditorium",
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1509803874385-db7c23652552?w=400&h=250&fit=crop",
        description: "Enjoy an evening of musical performances representing different cultures and traditions."
      },
    ],
    achievements: [
      "Won Best Cultural Club Award 2024",
      "Featured in City Arts Magazine",
      "Raised $15,000 for arts education charity",
      "Collaborated with professional theater company"
    ]
  },
  {
    id: "robotics",
    name: "Robotics Club",
    description: "The Robotics Club brings together students passionate about engineering, programming, and innovation. We design, build, and program robots for competitions, research projects, and community outreach. Our members gain hands-on experience with mechanical design, electronics, and artificial intelligence.",
    detailedDescription: "At the Robotics Club, we push the boundaries of technology through hands-on projects and competitions. Our members work on everything from simple automated systems to complex autonomous robots with computer vision capabilities. We participate in national robotics competitions, host workshops on topics like Arduino programming and 3D printing, and collaborate with engineering departments on research projects. Whether you're interested in mechanical design, electronics, programming, or AI, you'll find opportunities to apply your skills and learn new ones in a collaborative environment.",
    team: [
      { role: "President", name: "Alex Turner", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
      { role: "Technical Lead", name: "Sophia Martinez", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
      { role: "Mechanical Head", name: "Liam Wilson", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
      { role: "Programming Lead", name: "Emma Chen", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
      { role: "Electronics Specialist", name: "Noah Kim", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
      { role: "Outreach Coordinator", name: "Olivia Davis", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
    ],
    events: [],
    achievements: []
  },
  {
    id: "islamic",
    name: "Islamic Club",
    description: "The Islamic Club provides a supportive community for Muslim students and promotes understanding of Islamic culture and values. We organize religious activities, educational events, and interfaith dialogues to foster a inclusive campus environment.",
    detailedDescription: "Our Islamic Club serves as a home away from home for Muslim students, providing prayer facilities, religious guidance, and a supportive community. We organize weekly halaqas (study circles), celebrate Islamic holidays, and host interfaith events to promote mutual understanding. Our club also engages in community service projects and collaborates with other campus organizations to create a more inclusive environment. All students, regardless of religious background, are welcome to participate in our educational and social events.",
    team: [
      { role: "President", name: "Mohammed Ahmed", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
      { role: "Vice President", name: "Aisha Khan", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
      { role: "Treasurer", name: "Omar Hassan", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
      { role: "Events Coordinator", name: "Fatima Ali", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
      { role: "Outreach Officer", name: "Yusuf Ibrahim", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
      { role: "Secretary", name: "Zainab Mohammed", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
    ],
    events: [],
    achievements: []
  },
  {
    id: "innovation",
    name: "Innovation & Design Club",
    description: "The Innovation & Design Club fosters creativity and problem-solving through design thinking, prototyping, and entrepreneurship. We tackle real-world challenges and develop innovative solutions through collaborative projects.",
    detailedDescription: "At the Innovation & Design Club, we believe that great ideas can change the world. Our members learn design thinking methodologies, rapid prototyping techniques, and entrepreneurial skills through hands-on projects and workshops. We host design sprints, innovation challenges, and guest speaker events with industry leaders. Whether you're interested in product design, service design, or social innovation, you'll find a community of like-minded creators and opportunities to develop your ideas from concept to reality.",
    team: [
      { role: "President", name: "Ethan James", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
      { role: "Design Lead", name: "Mia Thompson", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
      { role: "Innovation Director", name: "Benjamin Clark", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
      { role: "Prototyping Specialist", name: "Chloe White", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
      { role: "Business Development", name: "Jacob Lewis", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
      { role: "Community Manager", name: "Lily Walker", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
    ],
    events: [],
    achievements: []
  },
  {
    id: "photography",
    name: "Photography Club",
    description: "The Photography Club brings together students passionate about capturing moments and telling stories through images. We explore various photography techniques, from digital to film, and develop both technical skills and artistic vision.",
    detailedDescription: "Our Photography Club is a community of visual storytellers who share a passion for capturing the world through lenses. We organize photo walks, technical workshops, portfolio reviews, and exhibitions to help members develop their skills and style. Whether you're interested in portrait, landscape, street, or experimental photography, you'll find opportunities to learn, practice, and showcase your work. We also collaborate with other clubs and campus events to document campus life and create visual content.",
    team: [
      { role: "President", name: "Samuel Green", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
      { role: "Technical Instructor", name: "Victoria Hill", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
      { role: "Creative Director", name: "Nathan Scott", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
      { role: "Events Coordinator", name: "Hannah Adams", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
      { role: "Digital Editor", name: "Christopher King", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
      { role: "Exhibitions Manager", name: "Zoe Parker", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
    ],
    events: [],
    achievements: []
  },
];

const ClubDetails = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const club = clubsData.find((c) => c.id === clubId);

  const handleJoin = (clubId) => {
    navigate(`/join-club/${clubId}`);
  };

  if (!club) return <p className="text-center text-xl p-8">Club not found!</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-green-100 dark:bg-slate-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black dark:text-white">
            {club.name}
          </h1>
          <motion.p
            className="text-xl max-w-4xl mx-auto leading-relaxed text-black dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {club.description}
          </motion.p>
        </motion.div>

        {/* About Club */}
        <motion.div
          className="rounded-2xl p-8 mb-16 shadow-lg bg-white dark:bg-slate-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">About Our Club</h2>
          <p className="text-lg leading-relaxed text-black dark:text-white">
            {club.detailedDescription}
          </p>
        </motion.div>

        {/* ✅ Meet Our Team */}
        <MeetTeam team={club.team} isDarkMode={isDarkMode} />

        {/* ✅ Join Our Team Button */}
        <JoinClub/>

        {/* Club Events Section */}
        {club.events.length > 0 && (
          <motion.div
            className="rounded-2xl p-8 mb-16 shadow-lg bg-white dark:bg-slate-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-black dark:text-white">Club Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {club.events.map((event, idx) => (
                <motion.div
                  key={event.id}
                  className="rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 bg-white dark:bg-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-xl mb-3 text-black dark:text-white">{event.title}</h4>
                    <p className="mb-4 text-black dark:text-white">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-black dark:text-white">
                        <Calendar className="mr-2 h-4 w-4" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-black dark:text-white">
                        <Clock className="mr-2 h-4 w-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-black dark:text-white">
                        <MapPin className="mr-2 h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                    <button className="w-full py-2 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                      Register Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Achievements Section */}
        {club.achievements.length > 0 && (
          <motion.div
            className="rounded-2xl p-8 mb-16 shadow-lg bg-white dark:bg-slate-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {club.achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 dark:bg-emerald-700 text-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start">
                    <Award className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p>{achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ClubDetails;
