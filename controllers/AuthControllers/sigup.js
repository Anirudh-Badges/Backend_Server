const User = require("../../models/user");
const Profile = require("../../models/profile");
const OTP = require("../../models/otp")
const bcrypt = require("bcrypt");


// signup
exports.signup = async (req, res) => {
    try {

        const {
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        if (
            !firstname ||
            !lastname ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp ||
            !accountType
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields has to filled",
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again.",
            })
        }

        let isEmailExist = await User.findOne({ email:email });

        if (isEmailExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue."
            })
        }


        // find the most recent OTP for the email
        const response = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(response);

        if(response.length == 0){
            // otp not found for the email
            return res.status(400).json({
                success:false,
                message:" The OTP is not valid"
            })
        }
        else if(otp !== response[0].otp){
            // Invalid OTP
            return res.status(400).json({
                success : false,
                message: "The OTP is not valid"
            })
        }

        // Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

        let approved = "";
        accountType === "Instructor" ? approved = false : approved = true;

        const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		
        try {
            const user = await User.create({
                firstname,
                lastname,
                email,
                contactNumber,
                password: hashedPassword,
                accountType: accountType,
                approved: approved,
                additionalDetails: profileDetails._id,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
            });


            return res.status(200).json({
                success: true,
                user,
                message: "User is SuccessFully Created"
            });

        } catch (error) {

            if(error.code === 11000){
                return  res.status(400).json({
                    success: false,
                    message: "User with this email already exists."
                })
            }
            else{
                throw error;
            }
        }


       
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User is not created please try again after some time..",
        })
    }
}
