//Screen showing a list of buttons that users can click on to select their role. The roles should be saved in an array. The options are also saved in an array.

import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles, {colors} from '../component.style.js';
import { useDispatch, useSelector } from 'react-redux';
import { saveNextMove } from '../redux/profileSlice.js';
import CheckBox from "expo-checkbox";

const roleCategories = ['Data', 'Design', 'Development', 'Finance', 'HR', 'Infrastructure', 'IT Support', 'Marketing', 'Project and Product', 'Sales'];
const roleTypes = [["BI Developer","Data"],
["Data Analyst","Data"],
["Data Architect","Data"],
["Data Engineer","Data"],
["Data Scientist","Data"],
["Designer","Design"],
["User Researcher","Design"],
["UX Designer","Design"],
[".NET Developer","Development"],
["Android Developer","Development"],
["Automation Tester","Development"],
["C# Developer","Development"],
["Design Engineer","Development"],
["Embedded Software Engineer","Development"],
["Engineering Manager","Development"],
["Enterprise Architect","Development"],
["Front End Developer","Development"],
["Full Stack Developer","Development"],
["iOS Developer","Development"],
["Java Developer","Development"],
["JavaScript Developer","Development"],
["PHP Developer","Development"],
["Python Developer","Development"],
["QA Engineer","Development"],
["React Developer","Development"],
["Salesforce Developer","Development"],
["Solution Architect","Development"],
["Technical Architect","Development"],
["Test Analyst","Development"],
["Test Engineer","Development"],
["Web Developer","Development"],
["Accountant","Finance"],
["Accounts Assistant","Finance"],
["Contracts Manager","Finance"],
["Finance Analyst","Finance"],
["Finance Assistant","Finance"],
["Finance Business Partner","Finance"],
["Finance Manager","Finance"],
["Financial Accountant","Finance"],
["Financial Controller","Finance"],
["Management Accountant","Finance"],
["Office Administrator","Finance"],
["Payroll Administrator","Finance"],
["Purchase Ledger Clerk","Finance"],
["Graduate Recruitment Consultant","HR"],
["HR Administrator","HR"],
["HR Manager","HR"],
["Recruitment Consultant","HR"],
["Recruitment Resourcer","HR"],
["AWS DevOps Engineer","Infrastructure"],
["Azure DevOps Engineer","Infrastructure"],
["Cloud Engineer","Infrastructure"],
["DevOps Engineer","Infrastructure"],
["Infrastructure Engineer","Infrastructure"],
["Maintenance Engineer","Infrastructure"],
["Maintenance Technician","Infrastructure"],
["Network Engineer","Infrastructure"],
["Systems Engineer","Infrastructure"],
["2nd Line Support Engineer","IT Support"],
["Application Support Analyst","IT Support"],
["Customer Service Administrator","IT Support"],
["Customer Service Advisor","IT Support"],
["Customer Services Assistant","IT Support"],
["IT Support Engineer","IT Support"],
["Security Officer","IT Support"],
["Service Advisor","IT Support"],
["Service Desk Analyst","IT Support"],
["Service Engineer","IT Support"],
["Support Engineer","IT Support"],
["Digital Marketing Apprentice","Marketing"],
["Digital Marketing Executive","Marketing"],
["Digital Marketing Manager","Marketing"],
["Marketing Executive","Marketing"],
["Marketing Manager","Marketing"],
["Business Analyst","Project and Product"],
["Delivery Manager","Project and Product"],
["Digital Project Manager","Project and Product"],
["IT Project Manager","Project and Product"],
["Product Manager","Project and Product"],
["Product Owner","Project and Product"],
["Programme Manager","Project and Product"],
["Project Coordinator","Project and Product"],
["Project Engineer","Project and Product"],
["Project Manager","Project and Product"],
["Scrum Master","Project and Product"],
["Service Delivery Manager","Project and Product"],
["Service Manager","Project and Product"],
["Technical Business Analyst","Project and Product"],
["Technical Project Manager","Project and Product"],
["Account Manager","Sales"],
["Area Sales Manager","Sales"],
["Business Development Executive","Sales"],
["Business Development Manager","Sales"],
["Commercial Manager","Sales"],
["Sales Executive","Sales"],
["Sales Manager","Sales"],
["Sales Negotiator","Sales"],
["Sales Representative","Sales"]];

const RoleCheckbox = ({ type, checked: isChecked, onChange }) => {
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox value={isChecked} onValueChange={(checked) => onChange(checked, type)}
            color={isChecked ? 'blue' : undefined}/>
            <Text style={styles.checkboxText} onPress={() => onChange(!isChecked, type)}>{type}</Text>
        </View>
    );
}

const RoleTitle = () => {

    const nav = useNavigation();
    const dispatch = useDispatch();
    const initialSelectedRole = useSelector(state => state.profile.nextMove.titles);
    const [selectedRole, setSelectedRole] = useState(initialSelectedRole);
    const [selectedRoleCategories, setSelectedRoleCategories] = useState([]);
    const [search, setSearch] = useState("");

    const handleButtonClick = (buttonText) => {
        if (selectedRoleCategories.includes(buttonText)) {
            setSelectedRoleCategories(selectedRoleCategories.filter((text) => text !== buttonText));
        } else {
            setSelectedRoleCategories([...selectedRoleCategories, buttonText]);
        }
    };

    const handleRoleSelected = (selected, role) => {
        if (!selected) {
            setSelectedRole(selectedRole.filter((text) => text !== role));
        } else {
            setSelectedRole([...selectedRole, role]);
        }
    }

    return (

        <View style={styles.container}> 
            <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>What role would you like to do next (select up to 5)?</Text>
            <TextInput 
                style={[styles.input, {marginBottom: 0}]} 
                placeholder="Type your role here, or select it below" 
                placeholderTextColor={colors.fieldPlaceHolderTextColor}
                onChangeText={text => setSearch(text)}/> 

            { search.length <= 2 &&
                <View style={[styles.buttonContainer, {flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-evenly', marginBottom: 20} ]}>
                {roleCategories.map((roleCategory) => (
                    <TouchableOpacity
                        style={selectedRoleCategories.includes(roleCategory) ? styles.optionButtonSelected: styles.optionButton}
                        key={roleCategory}
                        onPress={() => handleButtonClick(roleCategory)}
                    >
                        <Text style={selectedRoleCategories.includes(roleCategory) ? styles.buttonText: styles.optionButtonText}>{roleCategory}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            }

            <View style={styles.checkboxGroup}>
            {roleTypes.map((roleType) => (
                (selectedRole.includes(roleType[0]) || (search.length <= 2 && selectedRoleCategories.includes(roleType[1])) || (search.length > 2 && roleType[0].includes(search))) && 
                <RoleCheckbox type={roleType[0]} checked={selectedRole.includes(roleType[0])} onChange={handleRoleSelected} key={roleType[0]}/>
            ))} 
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(saveNextMove({titles: selectedRole}));
                    nav.navigate("Next Move");
                }}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default RoleTitle;