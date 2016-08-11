require 'test_helper'

class ItemsControllerTest < ActionDispatch::IntegrationTest
  test "should get info" do
    get items_info_url
    assert_response :success
  end

  test "should get import" do
    get items_import_url
    assert_response :success
  end

end
