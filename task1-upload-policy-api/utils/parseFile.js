// utils/parseFile.js
const XLSX = require('xlsx');
const User = require('../models/User');
const Agent = require('../models/Agent');
const Account = require('../models/Account');
const LOB = require('../models/LOB');
const Carrier = require('../models/Carrier');
const Policy = require('../models/Policy');

module.exports = async function parseFile(filePath) {
  console.log("Reading file:", filePath);

  const workbook = XLSX.readFile(filePath);
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
  console.log(`Found ${sheet.length} rows`);

  for (const row of sheet) {
    // Create/Insert data into MongoDB
    const user = await User.create({
      firstName: row.first_name || row.firstname,
      dob: row.dob,
      address: row.address,
      phone: row.phone,
      state: row.state,
      zipCode: row.zip_code,
      email: row.email,
      gender: row.gender,
      userType: row.userType,
    });

    const agent = await Agent.create({ name: row.agent });
    const account = await Account.create({ name: row.account_name });
    const lob = await LOB.create({ categoryName: row.category_name });
    const carrier = await Carrier.create({ companyName: row.company_name });

    await Policy.create({
      policyNumber: row.policy_number,
      policyStartDate: row.policy_start_date,
      policyEndDate: row.policy_end_date,
      lobId: lob._id,
      carrierId: carrier._id,
      userId: user._id,
      accountId: account._id,
      agentId: agent._id,
    });
  }

  console.log("File parsed and data saved successfully.");
};
