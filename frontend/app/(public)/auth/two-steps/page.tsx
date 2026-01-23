import { Suspense } from "react";

import { TwoStepsForm } from "@/modules/auth/two-steps/TwoStepsForm";

const TwoStepsPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to your email address. Please enter the 6-digit code below.
          </p>
        </div>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Suspense fallback={<div>Loading...</div>}>
            <TwoStepsForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default TwoStepsPage;
