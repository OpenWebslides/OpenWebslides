# frozen_string_literal: true
module Api
  class UsersController < ApiController
    def index
      @users = policy_scope User
    end

    def show
      @user = User.find params[:id]
      authorize @user
    end

    def create
      @user = User.new user_params
      authorize @user

      if @user.save
        render :status => :created
      else
        respond_with_errors @user
      end
    end

    def update
      @user = User.find params[:id]
      authorize @user

      if @user.update user_params
        render :status => :ok
      else
        respond_with_errors @user
      end
    end

    def destroy
      @user = User.find params[:id]
      authorize @user

      @user.destroy
      head :no_content
    end

    private

    def user_params
      params.require(:user).permit(:name, :email)
    end
  end
end
