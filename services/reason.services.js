export const reasonsForDeletion = [
  { value: "r1", label: "Inaccurate number of supplies" },
  {
    value: "r2",
    label: "Includes supplies that doesn’t exist in the actual pantry",
  },
  { value: "r3", label: "Tried to put harmful or illegal supply." },
  {
    value: "r4",
    label: "Attempted to put a curse or inappropriate word in the pantry name.",
  },
];

export const reasonsForNotApproving = [
  { value: "r1", label: "The address does not exist in the barangay." },
  {
    value: "r2",
    label: "Untrusted or Incorrect contact information.",
  },
  { value: "r3", label: "The pantry name is inappropriate for the community." },
  {
    value: "r4",
    label: "The closing time is either too early or too late. ",
  },
];

export const reasonsForNotApprovingRequest = [
  {
    value: "r1",
    label: "The supply that is requesting to be added is unnecessary.",
  },
  {
    value: "r2",
    label: "Adding ridiculous number of supplies.",
  },
  {
    value: "r3",
    label:
      "Trying to change the address without actual proof that they will reside there.",
  },
  {
    value: "r4",
    label: "The new pantry name is inappropriate. ",
  },
];
