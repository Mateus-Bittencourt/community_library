import loanRepository from "../repositories/loan.repositories.js";

async function createLoanService(userId, bookId, dueDate) {
  const createdLoan = await loanRepository.createLoanRepository(
    userId,
    bookId,
    dueDate
  );
  if (!createdLoan) throw new Error("Error creating loan");
  return createdLoan;
}

const findAllLoansService = async () =>
  await loanRepository.findAllLoansRepository();

const findLoanByIdService = async (loanId) => {
  const loan = await loanRepository.findLoanByIdRepository(loanId);
  if (!loan) throw new Error("Loan not found!");
  return loan;
}

const deleteLoanService = async (loanId, userId) => {
  const loan = await loanRepository.findLoanByIdRepository(loanId);
  if (!loan) throw new Error("Loan not found!");
  if (loan.user_id !== userId) throw new Error("Unauthorized access");

  const deletedLoan = await loanRepository.deleteLoanRepository(loanId);
  if (!deletedLoan) throw new Error("Error deleting loan");
  return deletedLoan;
}

export default {
  createLoanService,
  findAllLoansService,
  findLoanByIdService,
  deleteLoanService,
};
