
import { Course, Evaluation, Homework, AttendanceRecord, UserRole, Lecture, Message } from '../types';

export const CURRENT_USER = {
  name: '张教授',
  role: UserRole.TEACHER, // Default role
  id: 'T001',
  department: '数学与统计学院'
};

// Modified: Consistent subjects for a Math teacher
export const COURSES: Course[] = [
  { id: '1', name: '高等数学 (上)', teacher: '张教授', location: '一号教学楼 A-101', time: '08:00 - 09:35', class_name: '计算机科学 2201班', status: 'active' },
  { id: '2', name: '线性代数', teacher: '张教授', location: '二号教学楼 B-205', time: '10:00 - 11:35', class_name: '软件工程 2202班', status: 'upcoming' },
  { id: '3', name: '概率论与数理统计', teacher: '张教授', location: '信科楼 C-303', time: '14:00 - 15:35', class_name: '大数据 2101班', status: 'finished' },
];

export const HOMEWORK_LIST: Homework[] = [
  { id: '1', title: '第三章：导数与微分习题', deadline: '2023-10-28 23:59', course: '高等数学 (上)', status: 'pending', type: 'file' },
  { id: '2', title: '矩阵的初等变换练习', deadline: '2023-10-25 18:00', course: '线性代数', status: 'submitted', type: 'media', submitTime: '2023-10-25 14:20', studentAnswerUrl: 'matrix.pdf' },
  { id: '3', title: '大数定律分析报告', deadline: '2023-10-20 23:59', course: '概率论与数理统计', status: 'graded', score: 95, type: 'text', submitTime: '2023-10-20 20:00', feedback: '分析透彻，数据引用规范。', studentAnswerUrl: 'code.cpp' },
];

export const STUDENT_SUBMISSIONS = [
  { id: 's1', studentName: '李同学', studentId: '2023001', homeworkTitle: '第三章：导数与微分习题', status: 'pending', submitTime: '10-27 14:30', content: '附件: math_hw_li.pdf', score: null },
  { id: 's2', studentName: '王同学', studentId: '2023002', homeworkTitle: '第三章：导数与微分习题', status: 'graded', submitTime: '10-27 10:00', content: '附件: math_hw_wang.pdf', score: 90 },
  { id: 's3', studentName: '张同学', studentId: '2023003', homeworkTitle: '第三章：导数与微分习题', status: 'pending', submitTime: '10-27 15:00', content: '在线文本: 导数是...', score: null },
];

export const QUIZ_SUBMISSIONS = [
   { id: 'q1', studentName: '李同学', quizTitle: '第三章导数随堂测', question: '简述罗尔定理的几何意义', answer: '在每一点的切线斜率...', status: 'pending' },
   { id: 'q2', studentName: '王同学', quizTitle: '第三章导数随堂测', question: '简述罗尔定理的几何意义', answer: '切线平行于x轴', status: 'graded', score: 5 },
];

export const LECTURES: Lecture[] = [
  { id: '1', title: '数学建模竞赛辅导', speaker: '张教授', status: 'live', viewers: 1205, cover: 'https://picsum.photos/seed/l1/800/450', date: '2023-10-27 10:00' },
  { id: '2', title: '考研数学复习策略', speaker: '李教授', status: 'ended', viewers: 5400, cover: 'https://picsum.photos/seed/l2/800/450', date: '2023-10-25 19:00', duration: '1h 30m' },
];

export const MESSAGES: Message[] = [
  { id: '1', type: 'system', title: '教务处通知', content: '请各位老师于本周五前提交期中考试试卷。', time: '10分钟前', read: false },
  { id: '2', type: 'course', title: '调课申请通过', content: '您申请的《线性代数》调课已获批。', time: '2小时前', read: false },
  { id: '3', type: 'homework', title: '作业提交提醒', content: '《高等数学》作业提交率已达 95%。', time: '昨天', read: true },
];

export const EVALUATIONS: Evaluation[] = [
  { id: '1', courseName: '高等数学 (上)', totalStudents: 45, evaluatedCount: 32, endTime: '2023-10-27 10:00', status: 'active', duration: 5 },
  { id: '2', courseName: '线性代数', totalStudents: 42, evaluatedCount: 42, endTime: '2023-10-26 16:00', status: 'closed', duration: 10 },
];

// Mock Student List for Attendance
export const STUDENT_LIST = Array.from({ length: 45 }, (_, i) => ({
    id: `202300${i + 1}`,
    name: ['张伟', '李娜', '王强', '刘洋', '陈杰', '杨敏', '赵军', '黄艳'][i % 8] + (i + 1),
    status: i < 38 ? 'present' : i < 42 ? 'late' : 'absent',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`
}));

export const ATTENDANCE_RECORDS: AttendanceRecord[] = [
  { date: '2023-10-27', course: '高等数学 (上)', status: 'present', time: '07:55', seat: 'A-05' },
];

export const QUIZ_STATS = [
  { name: 'A', value: 12 },
  { name: 'B', value: 25 }, // Correct
  { name: 'C', value: 5 },
  { name: 'D', value: 3 },
];

export const ATTENDANCE_STATS = [
  { name: '出勤', value: 38, fill: '#4ade80' },
  { name: '缺勤', value: 3, fill: '#f87171' },
  { name: '迟到', value: 4, fill: '#fbbf24' },
];
export const PATROL_STATS = [
  { name: '正常', value: 85, fill: '#4ade80' },
  { name: '玩手机', value: 10, fill: '#fbbf24' },
  { name: '睡觉', value: 5, fill: '#f87171' },
];
