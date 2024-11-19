import NextButton from "./nextButton"
const QuestionNmae = () =>{
    return(
        <>
        <h2>What is your name?</h2>
        <div>
            <div>
                
                <label htmlFor="firstName">First Name</label>
                <input
                type="text"
                placeholder="First Name"
                //   value={formData.firstName}
                //   onChange={(e) =>
                //     setFormData({ ...formData, firstName: e.target.value })
                //   }
                />

            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                type="text"
                placeholder="Last Name"
                //   value={formData.lastName}
                //   onChange={(e) =>
                //     setFormData({ ...formData, lastName: e.target.value })
                //   }
                />
            </div>
            
           
  </div>
  <NextButton />
        
        
        </>
    )
}

export default QuestionNmae