export interface Job {
  Reason_for_Opening: string;
  Sales_Skill_Min_Score: any;
  Aptitude_Min_Score?: string;
  $currency_symbol: string;
  Posting_Title: string;
  Salesforce_Dev_Min_Score: any;
  Attention_to_Detail_Min_Score: any;
  Account_Manager: AccountManager;
  Target_Date?: string;
  Required_Skills?: string;
  Last_Activity_Time: string;
  Industry?: string;
  Moodle_Admin_Min_Score: any;
  Rationalizing_Min_Score: any;
  ATP_Hiring_Manager_eMail: string;
  $process_flow: boolean;
  Zip_Code?: string;
  id: string;
  Department_Name: DepartmentName;
  $approved: boolean;
  Web_Developer_Min_Score: any;
  Date_Opened: string;
  Hired_Weekly_Hours?: number;
  $approval: Approval;
  Territory: any[];
  Remote_Job: boolean;
  Created_Time: string;
  Data_Entry_Min_Score: any;
  $followed: boolean;
  $editable: boolean;
  Is_Locked: boolean;
  Org_Chart_List: any;
  City?: string;
  Job_Opening_Status: string;
  Associated_Tags: any[];
  Assigned_Recruiter: AssignedRecruiter[];
  Offshore: boolean;
  Interview_Team?: string;
  Work_Experience?: string;
  Job_Type: string;
  Job_Opening_Name: string;
  Customer_Service_Min_Score: any;
  Number_of_Positions: string;
  State?: string;
  Country?: string;
  Pre_Moodle_Assessments: string[];
  Created_By: CreatedBy;
  Is_Attachment_Present: boolean;
  Problem_Solving_Min_Score: any;
  Critical_Thinking_Min_Score: any;
  Salary?: string;
  Assigned_Recruiters: AssignedRecruiter2[];
  Subject_Matter_Min_Score: any;
  English_Min_Score: any;
  No_of_Candidates_Hired: number;
  Business_Math_Min_Score: any;
  Modified_By: ModifiedBy;
  Voice_Sample_Score: any;
  Is_Hot_Job_Opening: boolean;
  Job_Opening_Approved_by?: string;
  ATP_Hiring_Manager: string;
  Link_to_Job_Summary?: string;
  Job_TItle: string;
  Division?: string;
  Team?: string;
  Location_New_Field?: string;
  Publish: boolean;
  Modified_Time: string;
  Exempt_Status?: string;
  Link_to_Job_Requisition?: string;
  No_of_Candidates_Associated: number;
  HRDataEntry_Achieve_Test_Prep_com_used_in_workflow: string;
  Dotted_Line_Supervisor: any;
  Sandbox_Recruiter: any;
  Curriculum_Dev_Min_Score: any;
  Memorization_Recall_Min_Score: any;
  Job_Opening_ID: string;
  Job_Description: string;
  Sandbox_Recruiter_Email_Address: any;
  Applicant_Assessement: string[];
  EEO_Job_Category?: string;
  Formula_1: string;
  $approval_state: string;
  SOP_Writing_Min_Score: any;
}

export interface AccountManager {
  name: string;
  id: string;
}

export interface DepartmentName {
  name: string;
  id: string;
}

export interface Approval {
  delegate: boolean;
  approve: boolean;
  reject: boolean;
  resubmit: boolean;
}

export interface AssignedRecruiter {
  name: string;
  id: string;
  email: string;
  photoSrc: string;
}

export interface CreatedBy {
  name: string;
  id: string;
}

export interface AssignedRecruiter2 {
  name: string;
  id: string;
  email: string;
  photoSrc: string;
}

export interface ModifiedBy {
  name: string;
  id: string;
}
