require 'pony'
require 'rack-flash'
require 'sinatra/base'
require 'sinatra/activerecord'
require 'slim'

class Contact < ActiveRecord::Base
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :email, format: { with: VALID_EMAIL_REGEX },
                    length: { maximum: 50 },
                    presence: true,
                    uniqueness: true
  validates :name,    presence: true, length: { maximum: 50 }
  validates :subject, presence: true, length: { maximum: 50 }
  validates :message, presence: true, length: { maximum: 500 }
end

class ReidOnePage < Sinatra::Base
  register Sinatra::ActiveRecordExtension
  enable :sessions
  use Rack::Flash

  configure do
    Pony.options = {
      :via => 'smtp',
      :via_options => {
        :address => 'smtp.sendgrid.net',
        :port => 587,
        :domain => 'hihelloreid.com',
        :user_name => ENV['SENDGRID_USERNAME'],
        :password => ENV['SENDGRID_PASSWORD'],
        :authentication => :plain,
        :enable_starttls_auto => true
      }
    }
  end

  get '/' do
    slim :'index'
  end

  post '/contact' do
    @contact = Contact.new(name: params[:name], email: params[:email],
                            subject: params[:subject], message: params[:message])
    if request.xhr? && @contact.save
      flash.now[:message] = "Thank you, I'll be in touch soon!"
    else
      flash.now[:message] = "Oops, something's wrong with your form submission."
    end

    send_mail(@contact)
  end

  def send_mail(contact)
    Pony.mail(
      :from => contact.name + '<' + contact.email + '>',
      :to => 'hihelloreid@gmail.com',
      :subject => 'new hihelloreid contact',
      :body => contact.message
    )
  end
end