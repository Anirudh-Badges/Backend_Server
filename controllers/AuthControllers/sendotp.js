const User = require("../../models/user");
const Otp = require("../../models/otp");
const otpGenerator = require("otp-generator");

// sendotp
exports.sendOtp = async (req, res) => {

    try {
        const { email } = req.body;

        const userExist = await User.findOne({ email:email });

        if (userExist) {
            return res.status(403).json({
                success: false,
                message: "User is already exist"
            })
        }

        let otp =  otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:true,
        }) 

        const result = await Otp.findOne({otp: otp});

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
            });
        }

        const otpPayload = {email,otp};
        console.log(otpPayload)
        const otpBody = await Otp.create(otpPayload);
        console.log(otpBody);
        return res.status(200).json({
            success: true,
            message: "OTP  is Created SuccessFully..."
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message:error.message
        })
    }
}



