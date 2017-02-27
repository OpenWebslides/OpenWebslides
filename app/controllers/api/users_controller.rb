# frozen_string_literal: true
module Api
  class UsersController < ApiController
    def index
      @users = User.all
    end

    def show
      @user = User.find params[:id]
    end

    def create
      @user = User.new user_params
      if @user.save
        render :status => :created
      else
        render :status => :unprocessable_entity
      end
    end

    def update
      @user = User.find params[:id]
      if @user.update user_params
        render :status => :ok
      else
        render :status => :unprocessable_entity
      end
    end

    def destroy
      @user = User.find params[:id]
      @user.destroy
      head :no_content
    end

    private

    def user_params
      params.require(:user).permit(:name, :email)
    end
  end
end
